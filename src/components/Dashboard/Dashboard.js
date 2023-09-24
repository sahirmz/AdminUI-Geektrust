import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Table,
  Stack,
  Button,
} from "react-bootstrap";
import "./Dashboard.css";
import Header from "../Header/Header";
import axios from "axios";
import UsersUpdate from "../UsersUpdate/UsersUpdate";
import SearchField from "../SearchField/SearchField";
import Paginate from "../Paginate/Paginate";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Dashboard() {
  //useStates
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUsersId, setCheckedUsersId] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updateUserId, setUpdateUserId] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const POST_PER_PAGE = 10;
  const API_URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const updateUser = (userId) => {
    setUpdateUserId(userId);
    setModalShow(true);
  };

  const onSelectAll = (event) => {
    let updatedList = [...selectedUsersId];
    if (event.target.checked) {
      setIsAllChecked(true);
      updatedList = currentUsers.map((user) => user.id);
    } else {
      setIsAllChecked(false);
      updatedList = [];
    }
    setCheckedUsersId(updatedList);
  };

  const deleteSelected = () => {
    const updatedList = users.filter(
      (user) => !selectedUsersId.includes(user.id)
    );
    setUsers(updatedList);
    setIsAllChecked(false);
  };

  const onSelect = (event) => {
    const userId = event.target.value;
    let updatedList = [...selectedUsersId];

    if (event.target.checked) {
      updatedList = [...selectedUsersId, userId];
    } else {
      setIsAllChecked(false);
      updatedList.splice(selectedUsersId.indexOf(userId), 1);
    }
    setCheckedUsersId(updatedList);
  };

  const onDelete = (userId) => {
    const updatedList = users.filter((user) => user.id !== userId);
    setUsers(updatedList);
  };

  const onSearch = (event) => {
    setSearchKey(event.target.value);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.log("Error in getting users", error);
    }
  };

  //useEffects
  useEffect(() => {
    fetchUsers();
  }, []);

  // Update the filtered users when the user list or search key changes
  useEffect(() => {
    const filter = () => {
      if (searchKey !== "") {
        const result = users.filter((obj) =>
          Object.keys(obj).some((key) => obj[key].includes(searchKey))
        );
        setFilteredUsers(result);
      } else {
        setFilteredUsers(users);
      }
    };

    filter();
  }, [users, searchKey]);

  /* Pagination */
  const indexOfLastUser = currentPage * POST_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - POST_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / POST_PER_PAGE);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <SearchField onSearch={onSearch} />
          </Col>
        </Row>

        <Row>
          <Col className="mt-2">
            <Table bordered hover responsive>
              <thead style={{ borderBottom: "1px solid #ddd" }}>
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      onChange={onSelectAll}
                      checked={isAllChecked}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length ? (
                  currentUsers.map((user) => {
                    return (
                      <tr
                        key={user.id}
                        className={
                          selectedUsersId.includes(user.id) ? "bg-gray" : ""
                        }
                        style={{ borderBottom: "1px solid #ddd" }}
                      >
                        <td>
                          <Form.Check
                            type="checkbox"
                            value={user.id}
                            onChange={onSelect}
                            checked={selectedUsersId.includes(user.id)}
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1).toLowerCase()}
                        </td>
                        <td>
                          <Stack direction="horizontal" gap={5}>
                            <Button
                              className="actionButton"
                              variant="link"
                              size="sm"
                              onClick={() => updateUser(user.id)}
                            >
                              <i className="bi bi-pencil-square text-primary"></i>{" "}
                            </Button>

                            <Button
                              className="actionButton"
                              variant="link"
                              size="sm"
                              onClick={() => onDelete(user.id)}
                            >
                              <i className="bi bi-trash text-danger"></i>{" "}
                            </Button>
                          </Stack>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  // Displayed when no users are found
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No User Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Delete Selected Users */}
        {currentUsers.length > 0 ? (
          <Row className="pt-2 pt-md-0">
            <Col xs="12" md="4">
              {/* Button to delete selected users */}
              <Button
                variant="danger"
                size="sm"
                onClick={deleteSelected}
                disabled={selectedUsersId.length > 0 ? false : true}
                className="custom-button"
              >
                Delete Selected
              </Button>
            </Col>
            <Col xs="12" md="8">
              {/* Pagination component */}
              <Paginate
                currentPage={currentPage}
                paginate={paginate}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </Col>
          </Row>
        ) : (
          ""
        )}

        {/* modal for Users */}

        {modalShow ? (
          <UsersUpdate
            users={users}
            setUsers={setUsers}
            userId={updateUserId}
            setModalShow={setModalShow}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        ) : (
          ""
        )}
      </Container>
    </>
  );
}
