import { pgTable, serial, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';

export const PageTable = pgTable(
	'page',
	{
		id: serial('id').primaryKey(),
		title: text('title').notNull(),
		body: text('body').notNull(),
		...timestamps
	},
	(page) => {
		return {
			uniqueIdx: uniqueIndex('unique_idx').on(page.title)
		};
	}
);
