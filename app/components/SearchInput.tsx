import { FormControl, InputBase, InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledInputBase = styled(InputBase)(({ theme }) => {
  return {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: "20px",
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
    },
  };
});

interface SearchInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: Function;
}

const SearchInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <FormControl variant="standard">
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <StyledInputBase
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default SearchInput;
