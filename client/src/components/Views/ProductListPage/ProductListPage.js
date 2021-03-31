import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Products from "../Products/Products";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const {
        data: { productInfo },
      } = await axios.post("/api/product/get");
      setProducts(productInfo);
    };

    getProducts();
  }, []);
  return (
    <Warpper>
      <Header>
        <TitleBox>
          <Title>상품 목록</Title>
          <SearchIcon src="/images/icon/search@2x.png" alt="검색아이콘" />
        </TitleBox>
        <FilterBox>
          <FilterMenu>
            <FilterText color="#000" fontWeight="700">
              에코백
            </FilterText>
            <FilterText>
              <FilterLine></FilterLine>
            </FilterText>
            <FilterText>티셔츠</FilterText>
            <FilterText>
              <FilterLine></FilterLine>
            </FilterText>
            <FilterText>기타용품</FilterText>
          </FilterMenu>
        </FilterBox>
      </Header>
      <Content>
        <ProductsBox>
          {products.map((product, index) => (
            <Products
              key={index}
              id={product._id}
              type={product.type}
              name={product.name}
              rating={product.rating}
              price={product.price}
              image={product.image}
            />
          ))}
        </ProductsBox>
      </Content>
      <NavigationBar>
        <UnOrderList>
          <List>
            <NavIcon src="/images/icon/home@2x.png" alt="홈아이콘" />
            <NavText>홈</NavText>
          </List>

          <List>
            <NavIcon src="/images/icon/list@2x.png" alt="상품목록아이콘" />
            <NavText>상품 목록</NavText>
          </List>

          <List>
            <NavIcon src="/images/icon/add@2x.png" alt="등록하기아이콘" />
            <NavText>등록하기</NavText>
          </List>

          <List>
            <NavIcon src="/images/icon/search_nav@2x.png" alt="검색아이콘" />
            <NavText>검색</NavText>
          </List>

          <List>
            <Link to="/login">
              <NavIcon
                src="/images/icon/mypage@2x.png"
                alt="마이페이지아이콘"
              />
            </Link>
            <NavText>마이페이지</NavText>
          </List>
        </UnOrderList>
      </NavigationBar>
    </Warpper>
  );
}

const Warpper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 32px;
`;

const TitleBox = styled.div`
  width: 93.04812834224599%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const FilterBox = styled.nav`
  width: 93.04812834224599%;
  height: 24px;
`;

const FilterMenu = styled.ul`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
`;

const FilterText = styled.li`
  font-size: 16px;
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.color || "#bfbfbf"};
`;

const FilterLine = styled.span`
  display: block;
  width: 1px;
  height: 19px;
  margin: 0 12px;
  background-color: #bfbfbf;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-bottom: 86px;
`;

const ProductsBox = styled.ul`
  width: 93.04812834224599%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const NavigationBar = styled.nav`
  width: 100%;
  height: 64px;
  box-shadow: 0 0 4px 0 raba(0, 0, 0, 0.16);
  background-color: #fff;
  position: fixed;
  bottom: 0;
`;

const UnOrderList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
`;

const List = styled.li`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavIcon = styled.img`
  display: block;
  width: 32px;
  height: 32px;
`;

const NavText = styled.p`
  font-size: 12px;
  color: #bfbfbf;
`;
