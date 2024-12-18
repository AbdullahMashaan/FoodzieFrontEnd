import React, { useEffect, useState } from "react";
import food from "../assets/images/food.jpg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddCategory,
  DeleteCategory,
  EditCategory,
  getAllCategories,
  permission,
} from "../api/auth";
import { checkToken } from "../api/storage";
import { useNavigate } from "react-router";

const Categories = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkToken()) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [image, setImage] = useState(null);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });
  const { data: permissionData } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => permission(),
  });

  // فتح المودال للإضافة أو التعديل
  const openModal = (category = null) => {
    setIsEditing(!!category);
    setSelectedCategory(category);
    setCategoryName(category ? category.name : "");
    setCategoryImage(
      category ? `http://localhost:8080/media/${category.image}` : null
    );
    setShowModal(true);
  };

  const mutateAddCategory = useMutation({
    mutationKey: ["AddCategory"],
    mutationFn: (formData) => AddCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const mutateEditCategory = useMutation({
    mutationKey: ["EditCategory"],
    mutationFn: ({ id, formData }) => EditCategory(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  const mutateDeleteCategory = useMutation({
    mutationKey: ["DeleteCategory"],
    mutationFn: (id) => DeleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleSave = () => {
    if (!categoryName || !image) {
      alert("Please provide both a name and an image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", image ?? selectedCategory?.image);

    if (isEditing && selectedCategory) {
      mutateEditCategory.mutate({
        id: selectedCategory?._id,
        formData: { name: categoryName, image: formData?.image },
      });
    } else {
      mutateAddCategory.mutate(formData);
    }

    setShowModal(false);
    setCategoryName("");
    setCategoryImage(null);
    setSelectedCategory(null);
  };

  return (
    <>
      <div className="Recipes categories">
        <div className="recpesHero">
          <h2>View All Categories</h2>
        </div>

        <div className="allRecipes">
          <div className="container">
            {checkToken() && permissionData?.role === "admin" && (
              <button className="btn btn-dark" onClick={() => openModal()}>
                + Add New Category
              </button>
            )}
            {isLoading && <h1 className="loadingHead">Loading...</h1>}
            {isSuccess && (
              <div className="row">
                {data?.map(
                  (category) =>
                    (category?.image || category?.name) && (
                      <div
                        key={category._id}
                        className="mt-4 col col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12"
                      >
                        <div
                          className="CategoryCard position-relative"
                          style={{
                            backgroundImage: `url(${
                              `http://localhost:8080/media/${category?.image}` ??
                              category?.image
                            })`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            borderRadius: "10px",
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <h3 className="categoryTitle text-white text-center py-3">
                            {category?.name}
                          </h3>
                          {checkToken() && permissionData?.role === "admin" && (
                            <div className="btnActions btn-group position-absolute">
                              <button
                                className="btn btn-sm btn-light"
                                onClick={() => openModal(category)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  mutateDeleteCategory.mutate(category._id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* المودال */}
      {showModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              minWidth: "300px",
              maxWidth: "400px",
            }}
          >
            <h5>{isEditing ? "Edit Category" : "Add New Category"}</h5>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="form-control my-3"
              placeholder="Enter category name"
            />
            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setCategoryImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            {categoryImage && (
              <img
                src={categoryImage}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
