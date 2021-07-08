import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

// type ResposeType = {
// 	job: {
// 		id: string;
// 		state: string;
// 		createdAt: number;
// 	};
// };

export const fetchDeploy = async () => {
	const res = await axios.post(process.env.VERCEL_DEPLOY_HOOK!);
	return res.data;
};
