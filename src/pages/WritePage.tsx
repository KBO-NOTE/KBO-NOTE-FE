import { useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import Post1 from "../components/appBar/Post1";

import LinkIcon from "../assets/icons/link.svg";
import YoutubeIcon from "../assets/icons/youtube.svg";
import PhotoIcon from "../assets/icons/photo.svg";

type PostType = "link" | "youtube" | "photo" | null;

const WritePage = () => {
  const [selectedType, setSelectedType] = useState<PostType>(null);
  const [linkText, setLinkText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderInputBox = (
    type: PostType,
    title: string,
    iconSrc: string,
    placeholder: string,
  ) => {
    const isSelected = selectedType === type;

    return (
      <Card
        onClick={() => {
          setSelectedType(type);
          if (type === "photo" && !imagePreview) fileInputRef.current?.click();
        }}
        $isSelected={isSelected}
      >
        <CardHeader>
          <IconImage src={iconSrc} alt={title} />
          <CardTitle $isSelected={isSelected}>{title}</CardTitle>
        </CardHeader>

        {isSelected && (
          <InputWrapper onClick={(e) => e.stopPropagation()}>
            {type === "photo" ? (
              <PhotoUploadSection>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                {imagePreview ? (
                  <PreviewWrapper>
                    <PreviewImage src={imagePreview} />
                    <ChangePhotoButton
                      onClick={() => fileInputRef.current?.click()}
                    >
                      사진 변경
                    </ChangePhotoButton>
                  </PreviewWrapper>
                ) : (
                  <UploadPlaceholder
                    onClick={() => fileInputRef.current?.click()}
                  >
                    클릭하여 사진을 업로드하세요
                  </UploadPlaceholder>
                )}
              </PhotoUploadSection>
            ) : (
              <StyledInput
                placeholder={placeholder}
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                autoFocus
              />
            )}
          </InputWrapper>
        )}
      </Card>
    );
  };

  return (
    <Container>
      <Post1 />
      <Content>
        {renderInputBox(
          "link",
          "기사 링크 게시",
          LinkIcon,
          "링크를 입력해주세요",
        )}
        {renderInputBox(
          "youtube",
          "유튜브 영상 공유",
          YoutubeIcon,
          "유튜브 URL을 입력해주세요",
        )}
        {renderInputBox(
          "photo",
          "사진 업로드",
          PhotoIcon,
          "사진에 대한 설명을 입력해주세요",
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.white || "#f5f7f9"};
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 430px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
`;

const Card = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  box-sizing: border-box;
  background-color: ${(props) => (props.$isSelected ? "#FFFFFF" : "#E9ECEF")};
  border-radius: 12px;
  padding: 18px 20px;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.$isSelected ? theme.colors.primary400 : "transparent")};
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$isSelected ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none"};
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
`;

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  object-fit: contain;
`;

const CardTitle = styled.span<{ $isSelected: boolean }>`
  ${theme.typography.body01}
  font-weight: ${(props) => (props.$isSelected ? "bold" : "500")};
  color: ${(props) => (props.$isSelected ? theme.colors.black : "#333333")};
`;

const InputWrapper = styled.div`
  margin-top: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 10px 12px;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
`;

const PhotoUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PreviewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

const UploadPlaceholder = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #666;
`;

const ChangePhotoButton = styled.button`
  background: none;
  border: 1px solid ${theme.colors.primary400};
  color: ${theme.colors.primary400};
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
`;

export default WritePage;
