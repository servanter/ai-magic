
// 步骤项组件：负责单个步骤的“圆形序号 + 文字”
interface StepItemProps {
  number: number;
  text: string;
}

const StepItem = ({ number, text }: StepItemProps) => {
  return (
    <div className="flex items-center">
      {/* 圆形序号 */}
      <div className="w-10 h-10 border-2 border-indigo-600 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
        {number}
      </div>
      {/* 步骤文字 */}
      <span className="text-indigo-600">{text}</span>
    </div>
  );
};

// 分割线组件：步骤间的连接线条
const StepDivider = () => {
  return (
    <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
  );
};

// 主组件：整合标题和所有步骤
const HowToUse = () => {
  return (
    <section className="text-center w-screen bg-white min-h-[200px] mx-[-1rem] mb-10">
      <h2 className="text-4xl font-bold mb-8">How To Use</h2>
      <div className="flex justify-between items-center rounded-lg p-8">
        <StepItem number={1} text="Fill out the form" />
        <StepDivider />
        <StepItem number={2} text="Generate" />
        <StepDivider />
        <StepItem number={3} text="View result" />
      </div>
    </section>
  );
};

export default HowToUse;