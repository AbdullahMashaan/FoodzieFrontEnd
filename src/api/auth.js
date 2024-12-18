import instance from "./index";
const register = async (formData) => {
  const data = await instance.post("users/register", formData);
  localStorage.setItem("token", data.token);
  console.log("register data", data);
  return data;
};
const login = async (formData) => {
  const data = await instance.post("users/login", formData);
  localStorage.setItem("token", data.token);
  console.log("login data", data);
  return data;
};
const permission = async (formData) => {
  const data = await instance.get("users/permission");
  console.log("permission", data);
  return data;
};
const logout = () => {
  try {
    localStorage.removeItem("token");
    alert("User logged out successfully.");
  } catch (error) {
    console.error("Error during logout:", error.message);
  }
};

const getAllRecipes = async () => {
  const data = await instance.get("recipes");
  return data;
};
const getRecipeDetails = async (id) => {
  const data = await instance.get(`recipes/${id}`);
  return data;
};
const AddNewRecipe = async (formData) => {
  const data = await instance.post("recipes", formData);
  return data;
};
const editRecipe = async (id, formData) => {
  const data = await instance.put(`recipes/${id}`, formData);
  return data;
};
const DeleteRecipe = async (id) => {
  const data = await instance.delete(`recipes/${id}`);
  return data;
};

const getAllIngredients = async () => {
  const data = await instance.get("ingredients");
  return data;
};
const AddIngredient = async (formData) => {
  const data = await instance.post("ingredients", formData);
  return data;
};
const EditIngredient = async (id, formData) => {
  const data = await instance.put(`ingredients/${id}`, formData);
  return data;
};
const DeleteIngredient = async (id) => {
  const data = await instance.delete(`ingredients/${id}`);
  return data;
};

const getAllCategories = async () => {
  const data = await instance.get("categories");
  return data;
};
const AddCategory = async (formData) => {
  const data = await instance.post("categories", formData);
  return data;
};
const EditCategory = async (id, formData) => {
  const data = await instance.put(`categories/${id}`, formData);
  return data;
};
const DeleteCategory = async (id) => {
  const data = await instance.delete(`categories/${id}`);
  return data;
};

export {
  register,
  login,
  logout,
  permission,
  //
  getAllRecipes,
  getRecipeDetails,
  AddNewRecipe,
  editRecipe,
  DeleteRecipe,
  //
  getAllCategories,
  AddCategory,
  EditCategory,
  DeleteCategory,
  //
  getAllIngredients,
  AddIngredient,
  EditIngredient,
  DeleteIngredient,
  //
};
