import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  editRecipe,
  getAllCategories,
  getAllIngredients,
  getRecipeDetails,
  permission,
} from "../api/auth";
import { checkToken } from "../api/storage";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Select from "react-select";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: permissionData } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => permission(),
  });

  useEffect(() => {
    if (!checkToken() && permissionData?.role !== "admin") {
      navigate("/");
    }
  }, [permissionData, navigate]);

  const {
    data: recipeDetails,
    isSuccess: isDetailsLoaded,
    isLoading: isDetailsLoading,
  } = useQuery({
    queryKey: ["recipeDetails", id],
    queryFn: () => getRecipeDetails(id),
  });

  const {
    data: categories,
    isSuccess: isCategoriesLoaded,
    isLoading: isCategoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const {
    data: ingredients,
    isSuccess: isIngredientsLoaded,
    isLoading: isIngredientsLoading,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => getAllIngredients(),
  });

  const mutateEditRecipe = useMutation({
    mutationKey: ["EditRecipe"],
    mutationFn: ({ id, formData }) => editRecipe(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      alert("Recipe updated successfully!");
      navigate("/recipes");
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Recipe name is required"),
    ingredients: Yup.array().min(1, "Select at least one ingredient"),
    image: Yup.mixed().nullable(),
    instructions: Yup.string().required("Instructions are required"),
    category: Yup.string().required("Select a category"),
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);
    formData.append("instructions", values.instructions);
    formData.append("category", values.category);
    formData.append("ingredients", values.ingredients.join(","));

    mutateEditRecipe.mutate({ id, formData });
  };

  if (isDetailsLoading || isCategoriesLoading || isIngredientsLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (
    !isDetailsLoaded ||
    !isCategoriesLoaded ||
    !isIngredientsLoaded ||
    !recipeDetails
  ) {
    return <div>Failed to load data.</div>;
  }

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: (
      <div>
        <img
          src={category.image}
          alt={category.name}
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
        />
        <span style={{ marginLeft: "8px" }}>{category.name}</span>
      </div>
    ),
  }));

  const ingredientOptions = ingredients.map((ingredient) => ({
    value: ingredient._id,
    label: ingredient.name,
  }));

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Recipe</h2>
      <Formik
        initialValues={{
          name: recipeDetails.name || "",
          ingredients: recipeDetails.ingredients || [],
          image: null,
          instructions: recipeDetails.instructions || "",
          category: recipeDetails.category || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Recipe Name
              </label>
              <Field
                name="name"
                id="name"
                className={`form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
              />
              {errors.name && touched.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <Select
                id="ingredients"
                isMulti
                options={ingredientOptions}
                value={ingredientOptions.filter((option) =>
                  values.ingredients.includes(option.value)
                )}
                onChange={(selected) =>
                  setFieldValue(
                    "ingredients",
                    selected.map((option) => option.value)
                  )
                }
              />
              {errors.ingredients && touched.ingredients && (
                <div className="text-danger">{errors.ingredients}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <Select
                id="category"
                options={categoryOptions}
                value={categoryOptions.find(
                  (option) => option.value === values.category
                )}
                onChange={(selected) =>
                  setFieldValue("category", selected.value)
                }
              />
              {errors.category && touched.category && (
                <div className="text-danger">{errors.category}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={(event) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">
                Instructions
              </label>
              <Field
                as="textarea"
                name="instructions"
                id="instructions"
                className={`form-control ${
                  errors.instructions && touched.instructions
                    ? "is-invalid"
                    : ""
                }`}
              />
              {errors.instructions && touched.instructions && (
                <div className="invalid-feedback">{errors.instructions}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditRecipe;
