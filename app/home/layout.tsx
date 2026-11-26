import "./stylesheet.css";
export default function ({ children }: { children: React.ReactPortal }) {
    return (
        <div>{children}</div>
    )
}