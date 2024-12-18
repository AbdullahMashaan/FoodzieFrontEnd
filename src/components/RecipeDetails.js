import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getAllIngredients,
  getRecipeDetails,
} from "../api/auth";

const RecipeDetails = () => {
  const { id } = useParams();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["recipeDetails"],
    queryFn: () => getRecipeDetails(id),
  });

  const {
    data: ingredients,
    isSuccess: issuccessIngredients,
    isLoading: isloadingIngredients,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => getAllIngredients(),
  });
  const {
    data: categories,
    isSuccess: categorySuccess,
    isLoading: categoryLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const ingredientsFilter =
    issuccessIngredients && isSuccess
      ? ingredients?.filter((ingredient) =>
          data?.ingredients?.includes(ingredient?._id)
        )
      : [];
  const CategoryFilter =
    categorySuccess && isSuccess
      ? categories?.find((category) => category?._id === data?.category)
      : null;

  return (
    <>
      {isLoading ||
        categoryLoading ||
        (isloadingIngredients && <h1 className="loadingHead">Loading...</h1>)}
      <div className="Recipes RecpeDetails">
        <div className="recpesHero">
          <h2>{data?.name}</h2>
        </div>

        <div className="allRecipes allIngredients">
          <div className="container">
            {/* Recipe Details */}
            <div className="recipe-details">
              <img
                src={
                  `http://localhost:8080/media/${data?.image}` ?? data?.image
                }
                alt={data?.name}
                className="img-fluid mb-4 rounded"
              />
              <h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-card-checklist"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                  <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                </svg>{" "}
                Ingredients:
              </h4>
              <ul className="list-group mb-4">
                {ingredientsFilter?.map((ingredient) => (
                  <li className="list-group-item" key={ingredient?._id}>
                    {ingredient?.name}
                  </li>
                ))}
              </ul>
              {data?.instructions && (
                <>
                  <h4>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>{" "}
                    Instructions:
                  </h4>
                  <p className="mb-4">{data?.instructions}</p>
                </>
              )}
              {data?.category && (
                <h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-star"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                  </svg>{" "}
                  Category:{" "}
                  <Link to={"/categories"} className="btn btn-secondary btn-sm">
                    {CategoryFilter?.name}
                  </Link>
                </h4>
              )}
              {data?.prep_time && (
                <h4 className="text-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-alarm"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                  </svg>{" "}
                  Prep Time: {data?.prep_time}
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
