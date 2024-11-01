import './skeleton.scss';
interface SkeletonProps {
    height?: string;
    width?: string;
}
const Skeleton: React.FC<SkeletonProps> = ({ width, height }) => {
    return (
        <div className="skeleton" >
            <div className="skeleton-image" style={{ width,height }}></div>

        </div>
    );
};

export default Skeleton;