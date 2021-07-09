import * as functions from 'firebase-functions';
import * as path from 'path';
import { fetchDeploy } from './fetch/vercel';

const region = 'asia-northeast1';
const objectBuilder = functions.region(region).storage.object();

/**
 * 記事を投稿したとき
 */
export const onPostArticle = objectBuilder.onFinalize(async object => {
	onDeploy(object);
});

/**
 * 記事を削除したとき
 */
export const onDeleteArticle = objectBuilder.onDelete(async object => {
	onDeploy(object);
});

/**
 * Vercel のプロジェクトをデプロイする
 * @param object 対象の記事
 */
const onDeploy = async (object: functions.storage.ObjectMetadata) => {
	try {
		const postDir = path.dirname(object.name!);
		const postDirSplit = postDir.split('/');
		const ext = path.extname(object.name!).toLowerCase();

		if (postDirSplit[0] === 'posts' && ext == '.md') {
			// posts 配下で記事が更新された場合はデプロイする
			// posts/2021/title_0706.md のようなフォルダ構成にも対応した
			const response = await fetchDeploy();
			functions.logger.info('Deploy to Vercel', {
				trigger: object.name,
				...response
			});
		}
	} catch (error) {
		functions.logger.error({ error });
	}
};
