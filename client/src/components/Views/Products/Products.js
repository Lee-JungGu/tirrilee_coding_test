import React, { useEffect } from "react";
import styled from "styled-components";
import "../../../index.css";

function Products({ type, name, rating, price, image }) {
  useEffect(() => {
    const hideRatingImg = (target, targetRating) => {
      if (rating === targetRating) {
        target.forEach((rate) => {
          rate.classList.add("hide");
        });
      }
    };

    const drawRating = () => {
      const rating4 = document.querySelectorAll(".rating4");
      const rating3 = document.querySelectorAll(".rating3");
      const rating2 = document.querySelectorAll(".rating2");
      const rating1 = document.querySelectorAll(".rating1");

      hideRatingImg(rating4, "4");
      hideRatingImg(rating3, "3");
      hideRatingImg(rating2, "2");
      hideRatingImg(rating1, "1");
    };
    drawRating();
  }, [rating]);

  return (
    <>
      <Product>
        <ProductImg src={image} alt="상품이미지" />
        <LikeImg src="/images/icon/like@2x.png" alt="라이크이미지" />
        <ProductInfo>
          <Name>
            <Type>{type}</Type> {name}
          </Name>
          <Rating>
            <RatingImgBox>
              <RatingImg src="/images/icon/rating.png" alt="별이미지" />
              <RatingImg src="/images/icon/rating.png" alt="별이미지" />
              <RatingImg src="/images/icon/rating.png" alt="별이미지" />
              <RatingImg src="/images/icon/rating.png" alt="별이미지" />
              <RatingImg src="/images/icon/rating.png" alt="별이미지" />
            </RatingImgBox>
            <RatingImgBox>
              <RatingImg src="/images/icon/rating_color.png" alt="별이미지" />
              <RatingImg
                className="rating1"
                src="/images/icon/rating_color.png"
                alt="별이미지"
              />
              <RatingImg
                className="rating2 rating1"
                src="/images/icon/rating_color.png"
                alt="별이미지"
              />
              <RatingImg
                className="rating3 rating2 rating1"
                src="/images/icon/rating_color.png"
                alt="별이미지"
              />
              <RatingImg
                className="rating4 rating3 rating2 rating1"
                src="/images/icon/rating_color.png"
                alt="별이미지"
              />
            </RatingImgBox>
            <RatingText>({rating}.0)</RatingText>
          </Rating>
          <Price>
            {price} <PriceSpan>원</PriceSpan>
          </Price>
        </ProductInfo>
      </Product>
    </>
  );
}

const Product = styled.li`
  width: 48.27586206896552%;
  position: relative;
  margin-bottom: 20px;
`;

const ProductImg = styled.img`
  width: 100%;
`;

const LikeImg = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 9;
`;

const ProductInfo = styled.div`
  width: 100%;
`;

const Name = styled.h2`
  font-size: 14px;
`;

const Type = styled.span`
  font-size: 14px;
  color: #226bef;
`;

const Rating = styled.div`
  height: fit-content;
  margin-top: 5px;
  position: relative;
  display: flex;
`;

const RatingImgBox = styled.div`
  width: fit-content;
  position: absolute;
`;

const RatingImg = styled.img`
  width: 16px;
  height: 16px;
`;

const RatingText = styled.p`
  font-size: 12px;
  margin-left: 80px;
  color: #666666;
`;

const Price = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-top: 5px;
`;

const PriceSpan = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

export default Products;
