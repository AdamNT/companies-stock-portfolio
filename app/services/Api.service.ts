import { Company, ApiCompany } from "@interfaces";

const removeNumberFromObjectKeysArray = (
  array: Array<ApiCompany>
): Company[] | {}[] => {
  const newArrayObjects = array.map(object => {
    const newObject = Object.entries(object).reduce((acc, [key, value]) => {
      return { ...acc, [key.replace(/[0-9]. /g, "")]: value };
    }, {});

    return newObject;
  });

  return newArrayObjects;
};

export default {
  removeNumberFromObjectKeysArray,
};
