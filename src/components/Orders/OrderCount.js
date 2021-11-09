import styled from "styled-components";
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
export default function CartCountView(props){
    return(
        <TopText>Shopping Bag({props.CartCount})</TopText>
    )
}