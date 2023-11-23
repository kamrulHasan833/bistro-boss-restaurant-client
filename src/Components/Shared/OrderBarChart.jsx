import PropTypes from "prop-types";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import TriangleBar from "../Shared/TriangleBar";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const OrderBarChart = ({ categories }) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={categories}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar
        dataKey="quantity"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {categories.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
};

OrderBarChart.propTypes = {
  categories: PropTypes.array,
};

export default OrderBarChart;
