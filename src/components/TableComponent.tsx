import styled from "styled-components";
import { ProductsParams } from "../types/types"
import { Button, Container, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

interface TableComponentProps {
    products:ProductsParams [];
    onToggleBought:(productId: string)=>void;
    onDeleteProduct:(productId: string)=>void;
}

const StyledTable = styled.td<{isBought?: boolean}>`
  text-decoration: ${(props) => (props.isBought ? "line-through" : "none")};
`;

const TableComponent: React.FC<TableComponentProps> = ({products, onToggleBought, onDeleteProduct}) => {
    return (
        <Container>
            <Table hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Shop</th>
          <th>Category</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
       {products.map((product) => (
        <tr key={product.id}>
            <td className={product.isBought ? 'bought' : ''}>
              {product.name}
            </td>
            <td>{product.shop}</td>
            <td>{product.category}</td>
            <td>{product.isBought ? 'Bought' : 'Not Bought'}</td>
            <td>
              <div className='action-buttons'>
                <Button
                  variant={product.isBought ? 'warning' : 'success'}
                  size="sm"
                  onClick={() => onToggleBought(product.id)}
                >
                  {product.isBought ? 'Undo' : 'Mark as Bought'}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </div>
            </td>
        </tr>
       ))}
      </tbody>
    </Table>
        </Container>
    )
};

export default TableComponent;


