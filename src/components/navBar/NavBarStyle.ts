import styled from "styled-components";

const Nav = styled.nav`
	margin: 0;
	background-color: skyblue;
	width: 100vw;
`;

const List = styled.ul`
	list-style: none;
	display: flex;
	align-items: center;
	padding: 1rem 0 1rem 2rem;
	color: #fff;
	margin: 0;
`;

const ListItems = styled.li`
	padding: 0 1rem;

	& a {
		text-decoration: none;
		color: #fff;

		&:hover {
			color: rgba(255, 255, 255, 0.8);
		}
	}
`;

export { Nav, List, ListItems };
