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