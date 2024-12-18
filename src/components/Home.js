import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import imgHero from "../assets/images/vegetables-set-left-black-slate.jpg";
import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteRecipe, getAllRecipes, permission } from "../api/auth";
import { checkToken } from "../api/storage";
const Home = () => {
  const { data: permissionData } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => permission(),
  });
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
  });
  const queryClient = useQueryClient();
  const mutateDeleteRecipe = useMutation({
    mutationKey: ["DeleteRecipe"],
    mutationFn: (id) => DeleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  return (
    <>
      <Header />
      <main>
        <div className="hero">
          <div className="imgHero">
            <img src={imgHero} alt="restaurant" />
          </div>
          <div className="content">
            <h2>Where Taste Meets Elegance</h2>
            <p>
              "Savor the rich heritage of Our Restaurant, where every dish tells
              a story of tradition and bold flavors."
            </p>
          </div>
        </div>
        <div className="BestProducts">
          <div className="container">
            <h3>Best Recipes</h3>
            {isLoading && <h1 className="loadingHead">Loading...</h1>}
            {isSuccess && (
              <div className="row">
                {data?.length > 0 ? (
                  data.map(
                    (item) =>
                      (item?.name || item?.instructions || item?.image) && (
                        <div
                          key={item?._id}
                          className="mt-4 col col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12"
                        >
                          <div className="card">
                            <img
                              className="card-img-top"
                              src={
                                `http://localhost:8080/media/${item?.image}` ??
                                item?.image
                              }
                              alt={item?.name || "Recipe"}
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {item?.name || "Unnamed Recipe"}
                              </h5>
                              {checkToken() && (
                                <p className="card-text">
                                  {item?.instructions ||
                                    "No instructions available"}
                                </p>
                              )}
                              {checkToken() && (
                                <div className="cardLinks d-flex align-items-center gap-2">
                                  <Link
                                    to={`/recipes/${item?._id}`}
                                    className="btn btn-warning d-flex gap-1 align-items-center"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="black"
                                      className="bi bi-eye"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>
                                  </Link>
                                  {checkToken() &&
                                    permissionData?.role === "admin" && (
                                      <>
                                        <Link
                                          to={`/recipes/edit/${item?._id}`}
                                          className="btn btn-primary d-flex gap-1 align-items-center"
                                          style={{ width: "fit-content" }}
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
                                        </Link>
                                        <button
                                          className="btn btn-danger d-flex gap-1 align-items-center"
                                          style={{ width: "fit-content" }}
                                          onClick={() =>
                                            mutateDeleteRecipe.mutate(item._id)
                                          }
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
                                        </button>
                                      </>
                                    )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <p>No recipes found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
