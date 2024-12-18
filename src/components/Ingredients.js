import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddIngredient,
  DeleteIngredient,
  EditIngredient,
  getAllIngredients,
  permission,
} from "../api/auth";
import { useNavigate } from "react-router";
import { checkToken } from "../api/storage";

const Ingredients = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkToken()) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data: permissionData } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => permission(),
  });

  const queryClient = useQueryClient();
  const [showModalAdd, setshowModalAdd] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");

  const [showModalEdit, setshowModalEdit] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [editedName, setEditedName] = useState("");

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => getAllIngredients(),
  });

  const mutateAddIngredient = useMutation({
    mutationKey: ["AddIngredient"],
    mutationFn: (formData) => AddIngredient(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
  const handleAddIngredient = () => {
    mutateAddIngredient.mutate({
      name: newIngredient,
    });
    setshowModalAdd(false);
  };

  const mutateEditIngredient = useMutation({
    mutationKey: ["EditIngredient"],
    mutationFn: ({ id, formData }) => EditIngredient(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });

  const handleEdit = (ingredient) => {
    setSelectedIngredient(ingredient);
    setEditedName(ingredient?.name);
    setshowModalEdit(true);
  };
  const saveEdit = () => {
    mutateEditIngredient.mutate({
      id: selectedIngredient?._id,
      formData: { name: editedName },
    });
    setshowModalAdd(false);
    setshowModalEdit(false);
  };
  const mutateDeleteIngredient = useMutation({
    mutationKey: ["DeleteIngredient"],
    mutationFn: (id) => DeleteIngredient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
  const handleDelete = (id) => {
    mutateDeleteIngredient.mutate(id);
  };

  return (
    <>
      <div className="Recipes Ingredients">
        <div className="recpesHero">
          <h2>View All Ingredients</h2>
        </div>

        <div className="allRecipes allIngredients">
          <div className="container">
            <button
              className="btn btn-dark"
              onClick={() => setshowModalAdd(true)}
            >
              + Add New Ingredient
            </button>

            {/* Modal */}
            {showModalAdd && (
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
                  <h5>Add New Ingredient</h5>
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    className="form-control my-3"
                    placeholder="Enter ingredient name"
                  />
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setshowModalAdd(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleAddIngredient}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            <table className="table table-striped table-hover mt-3">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  {checkToken() && permissionData?.role === "admin" && (
                    <th>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {isLoading && <h1 className="loadingHead">Loading...</h1>}
                {isSuccess && (
                  <>
                    {data
                      ?.slice()
                      .reverse()
                      .map((ingredient) => (
                        <tr key={ingredient?._id}>
                          <td>{ingredient?._id}</td>
                          <td>{ingredient?.name}</td>
                          {checkToken() && permissionData?.role === "admin" && (
                            <td>
                              <button
                                className="btn btn-sm btn-primary me-2 d-inline-flex gap-1 align-items-center"
                                style={{ width: "fit-content" }}
                                onClick={() => handleEdit(ingredient)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="white"
                                  className="bi bi-pen"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger d-inline-flex gap-1 align-items-center"
                                onClick={() => handleDelete(ingredient?._id)}
                                style={{ width: "fit-content" }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="white"
                                  className="bi bi-trash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                                Delete
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
            {showModalEdit && (
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
                  <h5>Edit Ingredient</h5>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="form-control my-3"
                    placeholder="Enter ingredient name"
                  />
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setshowModalEdit(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={saveEdit}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ingredients;
