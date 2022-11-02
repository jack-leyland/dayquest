const validateEmail = (email: string): any => {
    const regexp = /^\S+@\S+$/;
    return regexp.test(email);
  };

export default validateEmail