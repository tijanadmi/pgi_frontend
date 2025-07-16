import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Промени свој налог</Heading>

      <Row>
        <Heading as="h3">Промени име и презиме</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Промени лозинку</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
