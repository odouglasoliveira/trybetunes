import styled from 'styled-components';

export const StyledHeader = styled.header`
  align-items: center;
  background-color: #00bd68;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100px;
  justify-content: center;

  .links-section {
    display: flex;
    gap: 30px;
  }
  
  .links-section div {
    align-items: center;
    background-color: white;
    border-radius: 10px;
    color: #00bd68;
    cursor: pointer;
    display: flex;
    height: 30px;
    justify-content: center;
    width: 150px;
  }
  
  .search-link, .favorites-link, .profile-link {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;
