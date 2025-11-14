import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net";

const Explore = () => {
  useEffect(() => {
    $(document).ready(function () {
      $("#myTable").DataTable();
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Explore Page</h2>

      <table
        id="myTable"
        className="display"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Sr No</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Role</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>1</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Khushi</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              khushi@gmail.com
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Admin</td>
          </tr>

          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>2</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>John</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              john@gmail.com
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>User</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Explore;
