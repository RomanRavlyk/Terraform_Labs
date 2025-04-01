module "label" {
  source = "cloudposse/label/null"
  # Cloud Posse recommends pinning every module to a specific version
  version = "0.25.0"
  context = var.context
  name    = var.name
}

module "label_get_all_authors" {
  source = "cloudposse/label/null"
  # Cloud Posse recommends pinning every module to a specific version
  version = "0.25.0"
  context = var.context
  name    = "get-all-authors"
}

module "lambda_get_all_authors" {
  source        = "terraform-aws-modules/lambda/aws"
  version       = "7.20.1"
  function_name = module.label_get_all_authors.id
  description   = "My awesome lambda function"
  handler       = "index.handler"
  runtime       = "nodejs16.x"

  source_path = "${path.module}/src/get_all_authors"

  environment_variables = {
    TABLE_NAME = var.authors_table
  }

  attach_policy_statements = true

  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = ["dynamodb:Scan"],
      resources = ["${var.authors_table_arn}"]
    }
  }

  tags = module.label.tags
}

module "label_get_all_courses" {
  source = "cloudposse/label/null"
  # Cloud Posse recommends pinning every module to a specific version
  version = "0.25.0"
  context = var.context
  name    = "get-all-courses"
}

module "lambda_get_all_courses" {
  source        = "terraform-aws-modules/lambda/aws"
  version       = "7.20.1"
  function_name = module.label_get_all_courses.id
  description   = "My awesome lambda function"
  handler       = "index.handler"
  runtime       = "nodejs16.x"

  source_path = "${path.module}/src/get_all_courses"

  environment_variables = {
    TABLE_COURSES = var.courses_table
  }

  attach_policy_statements = true

  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = ["dynamodb:Scan"],
      resources = ["${var.courses_table_arn}"]
    }
  }

  tags = module.label.tags
}

module "label_update_course" {
  source = "cloudposse/label/null"
  # Cloud Posse recommends pinning every module to a specific version
  version = "0.25.0"
  context = var.context
  name    = "update-course"
}

module "lambda_update_course" {
  source        = "terraform-aws-modules/lambda/aws"
  version       = "7.20.1"
  function_name = module.label_update_course.id
  description   = "My awesome lambda function"
  handler       = "index.handler"
  runtime       = "nodejs16.x"

  source_path = "${path.module}/src/update_course"

  environment_variables = {
    TABLE_COURSES = var.courses_table
  }

  attach_policy_statements = true

  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = ["dynamodb:PutItem"],
      resources = ["${var.courses_table_arn}"]
    }
  }

  tags = module.label.tags
}

module "label_save_course" {
  source = "cloudposse/label/null"
  # Cloud Posse recommends pinning every module to a specific version
  version = "0.25.0"
  context = var.context
  name    = "save-course"
}

module "lambda_save_course" {
  source        = "terraform-aws-modules/lambda/aws"
  version       = "7.20.1"
  function_name = module.label_save_course.id
  description   = "My awesome lambda function"
  handler       = "index.handler"
  runtime       = "nodejs16.x"

  source_path = "${path.module}/src/save_course"

  environment_variables = {
    TABLE_COURSES = var.courses_table
  }

  attach_policy_statements = true

  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = ["dynamodb:PutItem"],
      resources = ["${var.courses_table_arn}"]
    }
  }

  tags = module.label.tags
}

module "label_delete_course" {
  source = "cloudposse/label/null"
  # Cloud Posse recommends pinning every module to a specific version
  version = "0.25.0"
  context = var.context
  name    = "delete-course"
}

module "lambda_delete_course" {
  source        = "terraform-aws-modules/lambda/aws"
  version       = "7.20.1"
  function_name = module.label_delete_course.id
  description   = "My awesome lambda function"
  handler       = "index.handler"
  runtime       = "nodejs16.x"

  source_path = "${path.module}/src/delete_course"

  environment_variables = {
    TABLE_COURSES = var.courses_table
  }

  attach_policy_statements = true

  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = ["dynamodb:DeleteItem"],
      resources = ["${var.courses_table_arn}"]
    }
  }

  tags = module.label.tags
}

module "label_get_course" {
  source = "cloudposse/label/null"
  # Cloud Posse recommends pinning every module to a specific version
  version = "0.25.0"
  context = var.context
  name    = "get-course"
}

module "lambda_get_course" {
  source        = "terraform-aws-modules/lambda/aws"
  version       = "7.20.1"
  function_name = module.label_get_course.id
  description   = "My awesome lambda function"
  handler       = "index.handler"
  runtime       = "nodejs16.x"

  source_path = "${path.module}/src/get_course"

  environment_variables = {
    TABLE_COURSES = var.courses_table
  }

  attach_policy_statements = true

  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = ["dynamodb:GetItem"],
      resources = ["${var.courses_table_arn}"]
    }
  }

  tags = module.label.tags
}