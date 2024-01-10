const Select = ({ label, options, value, onChange, className }: any) => {
	const toCamelCase = (str: string) => {
		return str.replace(/\s+/g, '').replace(/-./g, (x) => x[1].toUpperCase());
	};

	return (
		<div className="form-control">
			<label className="label" htmlFor={toCamelCase(label)}>
				{label}
			</label>
			<select
				className={'select select-sm select-bordered' + (className ? ' ' + className : '')}
				name={toCamelCase(label)}
				id={toCamelCase(label)}
				defaultValue={value}
				onChange={onChange}
			>
				{options.map((option: any) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
export default Select;
