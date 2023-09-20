import styles from "./checkbox.module.css";

function Checkbox({ label, name }) {
    return (
    <label className={styles["ckb-wrapper","col-label"]}>
        {label}
        <input type="checkbox" name={name} />
        <span className={styles['checkmark','col-input']}> </span>
    </label>
    )
}
export default Checkbox;
