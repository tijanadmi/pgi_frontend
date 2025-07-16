import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="processed"
        options={[
          { value: "all", label: "All" },
          { value: "not-processed", label: "Not processed" },
          { value: "processed", label: "Processed" },
        ]}
      />
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "start_date-DESC", label: "Sort by date (recent first)" },
          { value: "start_date-ASC", label: "Sort by date (earlier first)" },
          { value: "room_price_en-DESC",label: "Sort by amount (high first)"},
          { value: "room_price_en-ASC", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
