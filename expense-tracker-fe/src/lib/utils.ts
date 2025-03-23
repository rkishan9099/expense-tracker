export const path = (base: string, ...values: (string | number)[]) => {
    return `${base}/${values.join("/")}`;
  };