import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const fetchDeploy = async () => {
	const res = await axios.post(process.env.VERCEL_DEPLOY_HOOK!);
	return res.data;
};
