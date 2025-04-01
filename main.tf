module "table_authors" {
    source = "./modules/dynamodb"
    context = module.label.context
    name = "authors"
}

module "table_courses" {
  source = "./modules/dynamodb"
  context = module.label.context
  name = "courses"
}

module "lambda_function" {
  source = "./modules/lambda"
  context = module.label.context
  courses_table     = module.table_courses.id
  authors_table     = module.table_authors.id
  courses_table_arn = module.table_courses.arn
  authors_table_arn = module.table_authors.arn
}