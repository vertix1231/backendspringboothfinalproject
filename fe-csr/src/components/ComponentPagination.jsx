import {useContext} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import ContextPagination from "../contexts/ContextPagination.jsx";

const ComponentPagination = () => {

  const [pagination, onNext, onPrevious] = useContext(ContextPagination);

  return (
      <ButtonGroup>
        <Button disabled={!pagination.previous} onClick={onPrevious}>
          Sebelumnya
        </Button>
        <Button disabled={!pagination.next} onClick={onNext}>
          Berikutnya
        </Button>
      </ButtonGroup>
  )
}

export default ComponentPagination;