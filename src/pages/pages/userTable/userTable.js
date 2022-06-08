import React, { useState, useEffect } from 'react';
import withAuth from "../../core/withAuth";
import { Table } from 'react-bootstrap';


const sideBar = props => {
	return (
		<>
			<Table striped bordered hover>
					<thead>
							<tr>
								<th>#</th>
								<th>User Name</th>
								<th>Gender</th>
								<th>Registered Date</th>
								<th>Email</th>
								<th>Status</th>
							</tr>
					</thead>
					<tbody>
							<tr>
								<td>1</td>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
								<td>Email</td>
								<td>Status</td>
							</tr>
							<tr>
								<td>2</td>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
								<td>Email</td>
								<td>Status</td>
							</tr>
							<tr>
								<td>3</td>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
								<td>Email</td>
								<td>Status</td>
							</tr>
					</tbody>
				</Table>
		</>
	)
}

export default withAuth(sideBar);