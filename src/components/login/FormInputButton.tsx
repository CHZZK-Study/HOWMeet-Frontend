import { ClearIcon, EyeOffIcon, EyeOnIcon } from 'public/assets/icons';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface Props {
  hasVisibility: boolean;
  fieldName: 'nickname' | 'password';
  isVisible: boolean;
  toggleVisibility: () => void;
}

function FormInputButton({
  hasVisibility,
  isVisible,
  fieldName,
  toggleVisibility,
}: Props) {
  const { watch, setValue, trigger } = useFormContext();
  const isClearable = watch(fieldName)?.length > 0;

  return (
    <Container className="icon-wrapper">
      {hasVisibility && (
        <button className="icon" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeOnIcon width={20} height={20} />
          ) : (
            <EyeOffIcon width={20} height={20} />
          )}
        </button>
      )}
      {isClearable && (
        <button
          className="icon"
          type="button"
          onClick={() => {
            setValue(fieldName, '');
            trigger(fieldName);
          }}
        >
          <ClearIcon width={20} height={20} />
        </button>
      )}
    </Container>
  );
}

export default FormInputButton;

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  gap: 12px;
`;
