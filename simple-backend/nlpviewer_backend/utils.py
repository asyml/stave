import hashlib
def gen_secret_code(tasks_session):
	"""
	input is docid1-docid2-docid3
	"""
	string = tasks_session + "-kairos"
	return hashlib.sha256(str.encode(string)).hexdigest()

