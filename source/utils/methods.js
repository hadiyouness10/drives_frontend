export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";
  if(! (email.includes('aub') || email.includes('lau') || email.includes('lu') || email.includes('bau')))  return "Please use your university email.";
  return "";
};

export const passwordValidator = (password) => {
  if (!password) return "Password can't be empty.";
  if (password.length < 5)
    return "Password must be at least 5 characters long.";
  return "";
};

export const nameValidator = (name) => {
  if (!name) return "Name can't be empty.";
  return "";
};

export const phoneValidator = (number) => {
  if (!number) return "Phone Number can't be empty.";
  return "";
};

export const birthDateValidator = (date) => {
  if (!date) return "Birthdate can't be empty.";
  return "";
};
