import {Form} from "react-bootstrap";

const ComponentValidator = ({messages, field}) => {


  if (messages && messages[field]) {
    // eslint-disable-next-line react/prop-types
    return messages[field].map((message, index) => (
      <Form.Text className={"text-danger d-block my-0"} key={index}>{message.message}</Form.Text>
    ))
  }

  return null;
}

export default ComponentValidator;