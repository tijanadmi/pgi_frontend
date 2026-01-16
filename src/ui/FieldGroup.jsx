// import styled from "styled-components";

// const FieldGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.8rem;

//   grid-column: span ${(props) => props.span || 1};
// `;
// export default FieldGroup;

import styled from "styled-components";

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  grid-column: span ${(props) => props.span || 1};
`;


export default FieldGroup;
