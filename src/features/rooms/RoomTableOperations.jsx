import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function RoomTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="guest_number"
        options={[
          { value: "all", label: "All" },
          { value: "les-2", label: "for guests <=2" },
          { value: "gr-2", label: "for guests > 2" },
        ]}
      />

      <SortBy
        options={[
          { value: "room_name_sr-asc", label: "Sort by name (A-Z)" },
          { value: "room_name_sr-desc", label: "Sort by name (Z-A)" },
          { value: "room_price_en-asc", label: "Sort by price (low first)" },
          { value: "room_price_en-desc", label: "Sort by price (high first)" },
          { value: "room_guest_number-asc", label: "Sort by capacity (low first)" },
          { value: "room_guest_number-desc", label: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default RoomTableOperations;