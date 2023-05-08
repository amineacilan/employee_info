import React from "react";
import Table from "react-bootstrap/Table";
function MyTable({ head, body }) {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            {head.map((h, key) => (
              <th key={key}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((items, key) => (
            <tr key={key}>
              {items.map((item, key) => (
                <td key={key}>
                  {Array.isArray(item) ? (
                    <div className="d-flex d-grid gap-4 justify-end">
                      {" "}
                      {item}
                    </div>
                  ) : (
                    item
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MyTable;
