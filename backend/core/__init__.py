import django.template.context

# Python 3.14 compatibility patch for Django template context copying.
# Python 3.14 disallows attribute assignment on super() objects, causing
# AttributeError in BaseContext.__copy__ when rendering templates.
def _patched_base_context_copy(self):
    duplicate = object.__new__(self.__class__)
    duplicate.__dict__.update(self.__dict__)
    duplicate.dicts = self.dicts[:]
    return duplicate

django.template.context.BaseContext.__copy__ = _patched_base_context_copy

