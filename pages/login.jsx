import Layout from 'components/layout/Layout';
import React from 'react';
import log from '../css/login.module.css';

const login = () => {
	return (
		<Layout>
			<form className={log.form}>
				<div className={log.field}>
					<input
						type='email'
						id='email'
						name='email'
						className=''
						placeholder=''
					/>
					<label htmlFor='email'>Email</label>
				</div>
				<div className={log.field}>
					<input
						type='password'
						id='password'
						name='password'
						className=''
						placeholder=''
					/>
					<label htmlFor='password'>Password</label>
				</div>
			</form>
		</Layout>
	);
};

export default login;
