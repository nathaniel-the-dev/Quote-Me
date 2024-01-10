import chroma from 'chroma-js';

const Input = ({ label, type = 'text', value, onChange, className }: any) => {
	const toCamelCase = (str: string) => {
		return str.replace(/\s/g, '').replace(/-./g, (x) => x[1].toUpperCase());
	};

	function handleChange(e: any) {
		if (type === 'color') {
			e.target.value = chroma(e.target.value).hex();
		}
		onChange(e);
	}

	return (
		<div className="form-control">
			<label className="label" htmlFor={toCamelCase(label)}>
				{label}
			</label>
			<input
				className={'input input-sm input-bordered' + (className ? ' ' + className : '')}
				type={type}
				name={toCamelCase(label)}
				id={toCamelCase(label)}
				defaultValue={value}
				onChange={handleChange}
			/>
		</div>
	);
};
export default Input;
