import styled from 'styled-components'

export const Details = styled.div`
  padding: 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGrey};

  h3 {
    margin: 0 0 5px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.grey};
  }

  .details {
    display: flex;
    margin-bottom: 15px;

    & > div {
      flex: 1;
    }

    p {
      margin: 0;
    }
  }

  .lists {
    display: flex;

    & > div {
      flex: 0 1 50%;
    }
  }
`

export const temp = styled.div``
