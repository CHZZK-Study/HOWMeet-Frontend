import ICONS from '@/constants/icons';
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
          <img
            src={
              isVisible ? ICONS.form.visibility_on : ICONS.form.visibility_off
            }
            alt="visibility"
            width={20}
          />
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
          <img src={ICONS.form.clear} alt="clear" width={20} />
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
