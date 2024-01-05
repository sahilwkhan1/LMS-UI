import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal, Switch } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [action, setaction] = useState("");
  const [editCourse, { isSuccess: editSuccess, error: editError }] =
    useEditCourseMutation();

  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: usersData } = useGetAllUsersQuery({});

  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});
  const columns = [
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "email", headerName: "Created By", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 1 },
    { field: "purchased", headerName: "Purchased", flex: 1 },
    { field: "created_at", headerName: "Created At", flex: 1 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 className="dark:text-white text-black" size={20} />
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <>
            <Button onClick={() => handleToggleAction(params, "delete")}>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "approve",
      headerName: "Approve",

      flex: 1,
      renderCell: (params: any) => (
        <Switch
          disabled={params.row.status === "Approved" ? true : false}
          sx={{
            cursor:
              params.row.status === "Approved" ? "not-allowed" : "pointer",
          }}
          checked={params.row.status === "Approved"}
          onClick={() => handleToggleAction(params, "approve")}
        />
      ),
    },
    {
      field: "reject",
      headerName: "Reject",
      flex: 1,
      renderCell: (params: any) => (
        <Switch
          disabled={
            params.row.status === "Rejected" || params.row.purchased !== 0
          }
          sx={{
            cursor:
              params.row.status === "Rejected" ||
              params.row.status === "Approved"
                ? "not-allowed"
                : "pointer",
          }}
          checked={params.row.status === "Rejected"}
          onClick={() => handleToggleAction(params, "reject")}
        />
      ),
    },
  ];

  // const rows: any = [];

  useEffect(() => {
    if (data) {
      const newRows = data.courses.map((item: any) => {
        const courseOwnerEmail = usersData?.usersData.find((user: any) => {
          const createdCoursesArray = user.createdCourses.map(
            (course: any) => course._id
          );
          return createdCoursesArray.includes(item._id);
        });

        return {
          id: item._id,
          email: courseOwnerEmail?.email || "",
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt),
          status: item.status,
        };
      });

      setRows(newRows);
    }
  }, [data, usersData]);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (editSuccess) {
      setOpen(false);
      refetch();
      if (action === "approve") toast.success("Course Approved Successfully");
      else toast.success("Course Rejected Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch, editSuccess]);

  const handleDelete = async (e: any) => {
    if (action === "delete") {
      const id = courseId;
      await deleteCourse(id);
    } else if (action === "approve") {
      const clickedCourse = data.courses.filter(
        (course: any) => course._id === courseId
      );
      const clickCopy = { ...clickedCourse[0] };
      clickCopy.status = "Approved";
      await editCourse({ id: courseId, data: clickCopy });
      setOpen(false);
    } else {
      const clickedCourse = data.courses.filter(
        (course: any) => course._id === courseId
      );
      const clickCopy = { ...clickedCourse[0] };
      clickCopy.status = "Rejected";
      await editCourse({ id: courseId, data: clickCopy });
      setOpen(false);
    }
  };

  const handleToggleAction = (params: any, atype: string) => {
    setOpen(!open);
    setCourseId(params.row.id);
    setaction(atype);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>
                  {action === "delete" ? (
                    <p>Are you sure you want to delete this course </p>
                  ) : action === "approve" ? (
                    <p>Are you sure you want to Approve this course </p>
                  ) : action === "reject" ? (
                    <p>Are you sure you want to Reject this course </p>
                  ) : (
                    ""
                  )}
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                    onClick={(e) => handleDelete(e)}
                  >
                    {action === "delete" ? (
                      <p>Delete </p>
                    ) : action === "approve" ? (
                      <p>Approve </p>
                    ) : action === "reject" ? (
                      <p>Reject </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
