import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Header = styled.header`
  height: 100px;
  border-bottom: 2px solid #ccc;
`

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  max-width: ${({ theme }) => theme.containerWidth};
  margin: 0 auto;
  padding: 0 20px;
`

export const CustomLink = styled(Link)`
  margin-right: 40px;
  margin-bottom: -2px;
  padding: 10px 0;
  color: ${(props) =>
    props.pathname === props.to || (props.pathname === '/' && props.to === '/items')
      ? props.theme.colors.blue
      : props.theme.colors.grey};
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
  border-bottom: ${(props) =>
    props.pathname === props.to || (props.pathname === '/' && props.to === '/items')
      ? `5px solid ${props.theme.colors.blue}`
      : `5px solid transparent`};
`
