import './form-input.styles.scss';

interface IFormInputProps {
  label: string;
  [key: string]: any;
}

const FormInput: React.FC<IFormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      {label && (
        <>
          <input className="form-input" {...otherProps} />
          <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
        </>
      )}
    </div>
  );
};

export default FormInput;
