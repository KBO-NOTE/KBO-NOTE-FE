/**
 * Storybook 스토리 자동 생성 스크립트
 *
 * 사용법: npx tsx scripts/generate-stories.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const COMPONENTS_DIR = path.join(process.cwd(), 'src', 'components');

interface PropInfo {
  name: string;
  type: string;
  optional: boolean;
}

interface ComponentInfo {
  name: string;
  filePath: string;
  props: PropInfo[];
}

function parseProps(content: string): PropInfo[] {
  const props: PropInfo[] = [];
  const interfaceMatch = content.match(/interface\s+\w*Props\s*\{([^}]+)\}/s);
  if (!interfaceMatch) return props;

  const propsContent = interfaceMatch[1];
  const propLines = propsContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));

  for (const line of propLines) {
    const propMatch = line.match(/(\w+)(\?)?:\s*([^;]+)/);
    if (propMatch) {
      props.push({
        name: propMatch[1],
        optional: !!propMatch[2],
        type: propMatch[3].trim(),
      });
    }
  }
  return props;
}

function getComponentName(content: string, fileName: string): string | null {
  const defaultExportMatch = content.match(/export\s+default\s+(\w+)/);
  if (defaultExportMatch) return defaultExportMatch[1];

  const constMatch = content.match(/const\s+(\w+)\s*=\s*\(/);
  if (constMatch) return constMatch[1];

  return fileName.replace('.tsx', '');
}

function getDefaultValue(prop: PropInfo): string {
  const type = prop.type.toLowerCase();

  if (type.includes('string')) {
    if (prop.name.toLowerCase().includes('text') || prop.name.toLowerCase().includes('name')) {
      return `"샘플 텍스트"`;
    }
    if (prop.name.toLowerCase().includes('image') || prop.name.toLowerCase().includes('src') || prop.name.toLowerCase().includes('url')) {
      return '"https://via.placeholder.com/150"';
    }
    return `"${prop.name}"`;
  }
  if (type.includes('number')) return '24';
  if (type.includes('boolean')) return 'false';
  if (type.includes('() =>') || type.includes('function')) return '() => console.log("clicked")';
  if (type.includes('|')) {
    const firstOption = type.split('|')[0].trim().replace(/['"]/g, '');
    if (type.includes("'") || type.includes('"')) return `"${firstOption}"`;
    return firstOption;
  }
  return 'undefined';
}

function generateStory(component: ComponentInfo): string {
  // 파일명만 추출하여 import 경로 생성
  const fileName = path.basename(component.filePath, '.tsx');
  const importPath = `./${fileName}`;

  // 카테고리 경로 추출 (components 이후의 폴더 구조)
  const relativePath = component.filePath
    .replace(COMPONENTS_DIR, '')
    .replace(/\\/g, '/')
    .replace(/^\//, '');
  const categoryPath = path.dirname(relativePath);

  const defaultArgs = component.props
    .map(prop => `    ${prop.name}: ${getDefaultValue(prop)},`)
    .join('\n');

  const argTypes = component.props
    .map(prop => {
      const type = prop.type.toLowerCase();
      if (type.includes('boolean')) return `    ${prop.name}: { control: 'boolean' },`;
      if (type.includes('number')) return `    ${prop.name}: { control: 'number' },`;
      if (type.includes('() =>') || type.includes('function')) return `    ${prop.name}: { action: '${prop.name}' },`;
      if (type.includes('|') && (type.includes("'") || type.includes('"'))) {
        const options = type.split('|').map(t => t.trim().replace(/['"]/g, ''));
        return `    ${prop.name}: { control: 'select', options: [${options.map(o => `'${o}'`).join(', ')}] },`;
      }
      return `    ${prop.name}: { control: 'text' },`;
    })
    .join('\n');

  // 파일명 기준으로 title 생성 (중복 방지)
  const title = categoryPath && categoryPath !== '.'
    ? `Components/${categoryPath}/${fileName}`
    : `Components/${fileName}`;

  // 컴포넌트 이름이 Default인 경우 충돌 방지
  const componentAlias = component.name === 'Default' ? 'DefaultComponent' : component.name;
  const importStatement = component.name === 'Default'
    ? `import DefaultComponent from '${importPath}';`
    : `import ${component.name} from '${importPath}';`;

  return `import type { Meta, StoryObj } from '@storybook/react-vite';
${importStatement}

const meta: Meta<typeof ${componentAlias}> = {
  title: '${title}',
  component: ${componentAlias},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
${argTypes}
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
${defaultArgs}
  },
};
`;
}

function scanComponents(dir: string): ComponentInfo[] {
  const components: ComponentInfo[] = [];

  function scan(currentDir: string) {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scan(filePath);
      } else if (file.endsWith('.tsx') && !file.includes('.stories.')) {
        const content = fs.readFileSync(filePath, 'utf-8');

        if (content.trim().length === 0) {
          console.log(`⏭️  스킵 (빈 파일): ${file}`);
          continue;
        }

        const componentName = getComponentName(content, file);
        if (!componentName) {
          console.log(`⏭️  스킵 (컴포넌트 없음): ${file}`);
          continue;
        }

        components.push({
          name: componentName,
          filePath,
          props: parseProps(content),
        });
      }
    }
  }

  scan(dir);
  return components;
}

function main() {
  console.log('🔍 컴포넌트 스캔 중...\n');

  const components = scanComponents(COMPONENTS_DIR);
  console.log(`📦 ${components.length}개의 컴포넌트 발견\n`);

  let created = 0;
  let skipped = 0;

  for (const component of components) {
    const storyPath = component.filePath.replace('.tsx', '.stories.tsx');

    if (fs.existsSync(storyPath)) {
      console.log(`⏭️  스킵 (이미 존재): ${path.basename(storyPath)}`);
      skipped++;
      continue;
    }

    fs.writeFileSync(storyPath, generateStory(component));
    console.log(`✅ 생성: ${path.basename(storyPath)}`);
    created++;
  }

  console.log(`\n📊 결과: ${created}개 생성, ${skipped}개 스킵`);
  console.log('🚀 npm run storybook 으로 확인하세요!');
}

main();
