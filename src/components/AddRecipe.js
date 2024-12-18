import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { AddNewRecipe, getAllCategories, getAllIngredients } from "../api/auth";
import { useNavigate } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { checkToken } from "../api/storage";
const AddRecipe = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkToken()) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryClient = useQueryClient();
  const {
    data: categories,
    isSuccess: successCategory,
    isLoading: loadingCategory,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });
  const {
    data: ingredients,
    isSuccess: successIngredients,
    isLoading: loadingIngredients,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => getAllIngredients(),
  });

  const mutateAddRecipe = useMutation({
    mutationKey: ["AddRecipe"],
    mutationFn: (formData) => AddNewRecipe(formData),
    onSuccess: () => {
      alert("recipe added successfully");
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  const initialValues = {
    name: "",
    ingredients: [],
    image: null,
    instructions: "",
    category: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Recipe name is required"),
    ingredients: Yup.array().min(1, "Select at least one ingredient"),
    image: Yup.mixed().required("An image is required"),
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

    mutateAddRecipe.mutate(formData);
  };
  return (
    <div className="container mt-4">
      <h2>Add New Recipe</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {/* Recipe Name */}
            <div className="mb-3">
              <label className="form-label">Recipe Name</label>
              <Field
                name="name"
                className="form-control"
                placeholder="Enter recipe name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Ingredients */}
            <div className="mb-3">
              <label className="form-label">Ingredients</label>
              <Select
                isMulti
                name="ingredients"
                options={
                  successIngredients
                    ? ingredients.map((ingredient) => ({
                        value: ingredient._id,
                        label: ingredient.name,
                      }))
                    : []
                }
                onChange={(selected) =>
                  setFieldValue(
                    "ingredients",
                    selected.map((item) => item.value)
                  )
                }
              />
              <ErrorMessage
                name="ingredients"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Image */}
            <div className="mb-3">
              <label className="form-label">Choose Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(event) =>
                  setFieldValue("image", event.target.files[0])
                }
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Instructions */}
            <div className="mb-3">
              <label className="form-label">Instructions</label>
              <Field
                as="textarea"
                name="instructions"
                className="form-control"
                rows="4"
              />
              <ErrorMessage
                name="instructions"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <Select
                name="category"
                options={
                  successCategory
                    ? categories.map((category) => ({
                        value: category._id,
                        label: (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={`http://localhost:8080/media/${category.image}`}
                              alt={category.name}
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                marginRight: 10,
                              }}
                            />
                            {category.name}
                          </div>
                        ),
                      }))
                    : []
                }
                onChange={(selected) =>
                  setFieldValue("category", selected.value)
                }
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Add Recipe
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipe;
